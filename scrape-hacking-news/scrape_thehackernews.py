import requests
from bs4 import BeautifulSoup

def scrape_hackernews():
    """
    Scrapes article titles and URLs from the Hacker News homepage.
    """
    url = "https://thehackernews.com/"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all article elements. Adjust the selector based on the website's structure.
        articles = soup.find_all('a', class_='story-link')

        if not articles:
            print("No articles found on the page.")
            return

        for article in articles:
            title = article.text.strip()
            link = article.get('href')
            if title and link:
                print(f"Title: {title}")
                print(f"URL: {link}")
                print("-" * 20)

    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
    except Exception as e:
        print(f"An error occurred during scraping: {e}")

if __name__ == "__main__":
    scrape_hackernews()