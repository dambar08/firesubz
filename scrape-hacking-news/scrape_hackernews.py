import requests
from bs4 import BeautifulSoup

def get_story_content(url):
    """
    Fetches the content of a given URL and attempts to extract the main article body.
    """
    try:
        response = requests.get(url, timeout=10) # Add a timeout to prevent hanging
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return f"Error fetching story content: {e}"

    soup = BeautifulSoup(response.text, 'html.parser')

    # Attempt to find common elements that might contain article content
    possible_content_tags = ['article', 'main']
    possible_content_classes = ['content', 'article-body', 'main-content', 'post-content']

    for tag in possible_content_tags:
        content = soup.find(tag)
        if content:
            return content.get_text(strip=True, separator='\\n')

    for class_name in possible_content_classes:
        content = soup.find(class_=class_name)
        if content:
            return content.get_text(strip=True, separator='\\n')

    return "Content not found."

def scrape_hackernews():
    """
    Scrapes the top 10 stories from Hacker News and prints their titles and URLs.
    """
    url = "https://news.ycombinator.com/"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the page: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')

    # Hacker News uses a table structure. We need to find the rows
    # that contain the story links.
    # Each story is typically represented by two rows in the table.
    # The first row with class 'athing submission' contains the title and link.
    story_rows = soup.find_all('tr', class_='athing submission')
    print("Top 10 Hacker News Stories:")
    for i, row in enumerate(story_rows[:10]):
        # Find the <td> with class 'title' within the story row
        title_tds = row.find_all('td', class_='title')
        if len(title_tds) > 1:
            # Select the second <td> with class 'title'
            second_title_td = title_tds[1]
            # Find the <span> with class 'titleline' within the second_title_td
            title_line_span = second_title_td.find('span', class_='titleline')
            if title_line_span:
                # Find the <a> tag directly within the title_line_span
                link = title_line_span.find('a')
                if link:
                    title = link.get_text()
                    url = link.get('href')
                    
                    story_content = get_story_content(url)
                    print(f"{i + 1}. {title} - {url}")
                else:
                    print(f"{i + 1}. Could not find story link.")
            else:
                print(f"{i + 1}. Could not find title line span.")
        else:
            print(f"{i + 1}. Could not find title td.")


if __name__ == "__main__":
    scrape_hackernews()