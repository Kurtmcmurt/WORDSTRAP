const https = require('node:https');
const { create } = require('xmlbuilder2');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = https.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

global.item = []

const unEscape = (htmlStr) => {
  htmlStr = htmlStr.replace(/&lt;/g , "<");	 
  htmlStr = htmlStr.replace(/&gt;/g , ">");     
  htmlStr = htmlStr.replace(/&quot;/g , "\"");  
  htmlStr = htmlStr.replace(/&#39;/g , "\'");   
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  return htmlStr;
}

const DataCollection = async () => {
  const response = await fetch(process.env.API_URL)
  const posts = await response.json();

  console.log(posts);

  posts.forEach(post => {
    const postObject = {
      title: `<![CDATA[${post.title}]]>`,
      link: post.slug,
      pubDate: post.published_at,
      'dc:creator': {
        '#cdata': 'admin',
      },
      description: post.description,
      'content:encoded': {
        '#raw': `<![CDATA[<!-- wp:shortcode -->${post.slices[0].content}<!-- /wp:shortcode -->]]>`,
      },
      'wp:post_id': post.id,
      'wp:post_name': `<![CDATA[${post.title}]]>`,
      'wp:post_type': `<![CDATA[post]]>`,
      'wp:status': `<![CDATA[publish]]>`,
      'excerpt:encoded': {
        '#cdata': '',
      },
    }

    console.log(postObject);

    item.push(postObject);
  });

  const doc = create({ version: '1.0', encoding: 'UTF-8' }, {
    rss: {
      '@version': 2.0,
      '@xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
      '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      '@xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
      '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
      '@xmlns:wp': 'http://wordpress.org/export/1.2/',
      channel: {
        title: 'WordPress test',
        link: 'http://localhost',
        description: 'Just another WordPress site',
        language: 'en-GB',
        'wp:wxr_version': 1.2,
        'wp:base_site_url': 'http://localhost',
        'wp:base_blog_url': 'http://localhost',
        'wp:author': {
          'wp:author_id': 1,
          'wp:author_login': {
            '#cdata': 'admin',
          },
          'wp:author_email': {
            '#cdata': 'kurtmcmurt@gmail.com',
          },
          'wp:author_display_name': {
            '#cdata': 'admin',
          },
          'wp:author_first_name': {
            '#cdata': '',
          },
          'wp:author_last_name': {
            '#cdata': '',
          },
        },
        item,
      },
    },
  });
  
  console.log(['doc.end: ', unEscape(doc.end({ prettyPrint: true }))]);

  fs.writeFile(`./xml/wordpress/test-${new Date().getTime()}.xml`, unEscape(doc.end({ prettyPrint: true })), err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}


server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
  
  DataCollection()
});
