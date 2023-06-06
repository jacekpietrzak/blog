const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
 */
router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/',
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Post :id
 */

router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: `NodeJs Blog | ${data.title}`,
      description: `Description here`,
    };

    currentRoute: '/post/:id',
      res.render('post', {
        locals,
        data,
        currentRoute: `/post/${slug}`,
      });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Search :searchTerm
 */

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: `NodeJs Blog | Search`,
      description: `Description here`,
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialCharacters = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialCharacters, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialCharacters, 'i') } },
      ],
    });
    // res.render('search', { locals, data });

    res.render('search', {
      data,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/about', (req, res) => {
  const locals = {
    title: 'NodeJs Blog | About',
    description: 'Simple Blog created with NodeJs, Express & MongoDb.',
  };
  res.render('about', { locals, currentRoute: '/about' });
});

router.get('/contact', (req, res) => {
  const locals = {
    title: 'NodeJs Blog | Contact',
    description: 'Simple Blog created with NodeJs, Express & MongoDb.',
  };
  res.render('contact', { locals, currentRoute: '/contact' });
});

module.exports = router;

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: 'Embracing Functional Programming in JavaScript',
//       body: "Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. It's a popular concept that JavaScript developers can adopt. In this post, we'll explain the basics of functional programming and how to use functional programming concepts in your JavaScript code. We'll cover pure functions, function composition, higher-order functions, and other essential concepts.",
//     },
//     {
//       title: 'Building RESTful APIs with Express.js',
//       body: "Express.js is a minimalist web framework for Node.js — being one of the most popular choices for building web applications and APIs. In this blog post, we'll show you how to build a simple RESTful API using Express.js. We'll discuss routing, middleware, error handling, and everything else you need to know to build a robust API.",
//     },
//     {
//       title: 'Deep Dive Into JavaScript Modules',
//       body: 'JavaScript modules are an essential concept to understand for modern JavaScript development. Modules allow developers to split their code into reusable parts. This post will take a deep dive into JavaScript modules, explaining how to create modules, import and export modules, and cover nuances around default and named exports.',
//     },
//     {
//       title: 'Implementing Data Structures in JavaScript',
//       body: "Understanding data structures is a vital part of being a proficient JavaScript developer. In this post, we'll cover how to implement some of the most commonly used data structures in JavaScript, including arrays, stacks, queues, and linked lists. We'll go over each data structure's properties, how to use them, and provide real-world examples of their applications.",
//     },
//     {
//       title: 'Mastering the Document Object Model (DOM)',
//       body: "The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document and enables developers to manipulate the content and structure of a web page. In this blog post, we'll explore the DOM in depth. We'll cover traversing the DOM, manipulating elements, handling events, and other essential DOM operations.",
//     },
//     {
//       title: 'Understanding and Using JavaScript Promises',
//       body: "Promises are an integral part of working with asynchronous operations in JavaScript. They represent a value that may be available in the future or never. This post will delve into JavaScript Promises, explaining how they work and how to use them effectively. We'll cover Promise states, chaining Promises, handling errors, and using Promise.all and Promise.race.",
//     },
//     {
//       title: 'Exploring the Fetch API for Ajax Requests',
//       body: 'The Fetch API provides a modern approach to making asynchronous HTTP requests, offering a more powerful and flexible feature set than XMLHttpRequest. This blog post will guide you through the Fetch API basics, showing you how to make GET and POST requests, how to work with the Response object, and how to handle errors.',
//     },
//     {
//       title: 'Boost Your JavaScript Debugging Skills',
//       body: "Debugging is an essential skill for any developer. Efficiently finding and fixing issues in your JavaScript code can save you a lot of time and frustration. In this post, we'll go through the most effective JavaScript debugging techniques. We'll explore the use of console methods, breakpoints, the debugger statement, and other browser development tools.",
//     },
//     {
//       title: 'The Power of JavaScript Array Methods',
//       body: 'JavaScript arrays come with many built-in methods that can make your life as a developer much easier. These methods help in manipulating arrays, allowing you to perform operations like adding, removing elements, finding values, or transforming arrays. This post will provide a detailed look at some of the most useful JavaScript array methods, including map(), reduce(), filter(), and forEach().',
//     },
//     {
//       title: 'The Role of JavaScript in Web Performance',
//       body: "Website performance is critical for improving user experience and SEO rankings. As JavaScript is often the most resource-heavy aspect of a website, understanding how to optimize JavaScript is essential. In this blog post, we'll explore various techniques to optimize your JavaScript code and improve your website's performance. We'll discuss minification, compression, caching, and other effective strategies.",
//     },
//   ]);
// }

// insertPostData();
