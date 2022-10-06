# WORDSTRAP
## Export post content from Strapi CMS to an XML format for WordPress Importer

Found in tools, WordPRess Importer needs to be installed before you can import the XMl file.

You will need to alter the code to fit your needs, it should give you a solid foundation in exporting content and you might even be able to go one step further and allocate content to specific WordPress blocks insead of just the `shortcode` block. 

Have fun! Pull requests welcome, I like to learn from others - theres a :100: chance this could be written better.

Env variable needed for API URI
```
Environment variables
API_URL=<enter something here>
# WORDPRESS CREDS
WORDPRESS_DB_NAME=wordpress
WORDPRESS_DB_HOST=db
WORDPRESS_DB_USER=wordpress
WORDPRESS_DB_PASSWORD=wordpress
# DB CREDS
MYSQL_ROOT_PASSWORD=wordpress
MYSQL_DATABASE=wordpress
MYSQL_USER=wordpress
MYSQL_PASSWORD=wordpress
# WORDPRESS CONFIG INFORMATION PER ENVIRONMENT - IMPORTANT FOR DEVOPS AS THIS IS THE DOMAIN WHICH IS SET IN THE DB ON WP INSTALL INIT
# WP_HOME_URL=http://example.com
# WP_SITEURL=http://example.com
```

# WordPress Docker Docs
## And other (hopefully) useful information

![A mystical gif of Nicholas Cage](https://media1.giphy.com/media/glvyCVWYJ21fq/giphy.gif)

This project was made with the intention of easing both developers and devops engineers lives. This is only a concept, it will need to be discussed with the wider team and will *likely* require some changes before utilising.

## Example .env file
Make sure you've got the .env file with the below content in the root of the project before proceeding:
```
# WORDPRESS CREDS
WORDPRESS_DB_NAME=wordpress
WORDPRESS_DB_HOST=db
WORDPRESS_DB_USER=wordpress
WORDPRESS_DB_PASSWORD=wordpress
# DB CREDS
MYSQL_ROOT_PASSWORD=wordpress
MYSQL_DATABASE=wordpress
MYSQL_USER=wordpress
MYSQL_PASSWORD=wordpress
# WORDPRESS CONFIG INFORMATION PER ENVIRONMENT - IMPORTANT FOR DEVOPS AS THIS IS THE DOMAIN WHICH IS SET IN THE DB ON WP INSTALL INIT
# WP_HOME_URL=http://example.com
# WP_SITEURL=http://example.com
```

## Getting started with Docker
In the terminal (making sure you're in the root directory of this project), run:
```
docker compose up -d OR
docker compose up -d --build (the latter being very helpful if changing the container)
```

If you're making changes to the image settings in `docker-compose.yml`, you may need to completely destroy the image and start again. To do this, run the following:
```
docker compose down -v
# AND THEN
docker compose up -d --build
```
This will ensure that the image is updated based on your changes in the docker-compose.yml file.

**### You probably won't need to change anything in this file.**

## WordPress Docker environment variables (dev ops)
### Additional environment variables and supporting information
```
WORDPRESS_DB_NAME (required, type: string)
WORDPRESS_DB_HOST (required, type: string)
WORDPRESS_DB_USER (required, type: string)
WORDPRESS_DB_PASSWORD (required, type: string)

WORDPRESS_DB_CHARSET (optional, type: string)

Example:
/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', getenv_docker('WORDPRESS_DB_CHARSET', 'utf8') );

WORDPRESS_DB_COLLATE (optional, type: string)

Example:
/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', getenv_docker('WORDPRESS_DB_COLLATE', '') );

WORDPRESS_AUTH_KEY (required, type: string)
WORDPRESS_SECURE_AUTH_KEY (required, type: string)
WORDPRESS_LOGGED_IN_KEY (required, type: string)
WORDPRESS_NONCE_KEY (required, type: string)
WORDPRESS_AUTH_SALT (required, type: string)
WORDPRESS_SECURE_AUTH_SALT (required, type: string)
WORDPRESS_LOGGED_IN_SALT (required, type: string)
WORDPRESS_NONCE_SALT (required, type: string)

Example:
/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         getenv_docker('WORDPRESS_AUTH_KEY',         'put your unique phrase here') );
define( 'SECURE_AUTH_KEY',  getenv_docker('WORDPRESS_SECURE_AUTH_KEY',  'put your unique phrase here') );
define( 'LOGGED_IN_KEY',    getenv_docker('WORDPRESS_LOGGED_IN_KEY',    'put your unique phrase here') );
define( 'NONCE_KEY',        getenv_docker('WORDPRESS_NONCE_KEY',        'put your unique phrase here') );
define( 'AUTH_SALT',        getenv_docker('WORDPRESS_AUTH_SALT',        'put your unique phrase here') );
define( 'SECURE_AUTH_SALT', getenv_docker('WORDPRESS_SECURE_AUTH_SALT', 'put your unique phrase here') );
define( 'LOGGED_IN_SALT',   getenv_docker('WORDPRESS_LOGGED_IN_SALT',   'put your unique phrase here') );
define( 'NONCE_SALT',       getenv_docker('WORDPRESS_NONCE_SALT',       'put your unique phrase here') );

WORDPRESS_TABLE_PREFIX (optional, type: string)

Example:
/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = getenv_docker('WORDPRESS_TABLE_PREFIX', 'wp_');

WORDPRESS_DEBUG (optional, type: string/boolean)

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', !!getenv_docker('WORDPRESS_DEBUG', '') );

WORDPRESS_CONFIG_EXTRA (optional, type: string)

Example:
// If we're behind a proxy server and using HTTPS, we need to alert WordPress of that fact
// see also https://wordpress.org/support/article/administration-over-ssl/#using-a-reverse-proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
	$_SERVER['HTTPS'] = 'on';
}
// (we include this by default because reverse proxying is extremely common in container environments)

if ($configExtra = getenv_docker('WORDPRESS_CONFIG_EXTRA', '')) {
	eval($configExtra);
}
```

## Gotchas
 - When developing for specific templates for specific posts etc, have a look at the codex on how to create content-specific pages. This normally affects page urls so be mindful of this. Wordpress codex on template hierarchy: https://developer.wordpress.org/themes/basics/template-hierarchy/. **If you've ever worked with Drupal, its very similar to that (except you have more freedom here if you're a PHP novice).**

## Database Docker environment variables
```
MYSQL_ROOT_PASSWORD (required, type: string) - Unsure with this one: don't think this needs to be implemented
MYSQL_DATABASE (required, type: string)
MYSQL_USER (required, type: string)
MYSQL_PASSWORD (required, type: string)
WP_HOME_URL (required, type: string)
WP_SITEURL (required, type: string)
```

## Connecting to the database
To connect to the DB the host is private so the will be 0.0.0.0. The ports are exposed but not directly accessible in the docker compose file - we needed to use a proxy to access the docker containers mysaql instance (like volumes).

Example (using Sequel Pro - will work with workbench as well):
```
Host: 0.0.0.0
Username: wordpress
Password: wordpress
Database: wordpress
Port: 4307
```

## Post optimisation
We can add additional settings to the wp-config.php (or wp-docker-config.php) file. One of the changes I added was post revision limits. This has caught me and previous teams out in the past as post revisions can build up and use a lot of server resource over time :moneybag:

Defined in docker-compose.yml as follows:
```
- WORDPRESS_CONFIG_EXTRA=
  define( 'WP_POST_REVISIONS', 3 );
  ...
```