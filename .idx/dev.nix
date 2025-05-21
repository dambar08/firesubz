# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    pkgs.python312
    pkgs.python312Packages.pip
    pkgs.nodejs_22
    # pkgs.nodePackages.nodemon
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "firesubz:dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };

        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "gamespot:dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };

        web = {
          command = ["npm" "run" "dev" "--" "-p" "$PORT"];
          manager = "web";
          env = {
            PORT = "3000";
          };
          cwd = "strapi-blog/client";
        };

        # web = {
        #   command = ["npm" "run" "strapi-blog:server:dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     HOST = "0.0.0.0"
        #     PORT = "1337";
        #   };
        #   cwd = "strapi-blog/server";  
        # };
      };
    };
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        firesubz-npm-install = "cd firesubz && npm install";
        gamespot-npm-install = "cd gamespot && npm install";
        strapi-server-npm-install = "cd strapi-blog && cd server && gamespot && npm install";
        strapi-client-npm-install = "cd strapi-blog && cd client && gamespot && npm install";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        watch-backend = "npm run strapi-blog:server:dev";
      };
    };
  };
}
