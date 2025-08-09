import React from 'react'
import { useSelector } from 'react-redux'

import VideoCard from './VideoCard'

const VideoList = () => {
    const sidebarOpen = useSelector((state) => state.SideBar.sidebarOpen)
  const videos = [
  {
    "videoId": "video01",
    "title": "Learn React in 30 Minutes",
    "thumbnailUrl": "https://example.com/thumbnails/react30min.png",
    "description": "A quick tutorial to get started with React.",
    "channelId": "channel01",
    "uploader": "user01",
    "duration": "00:29:45",
    "views": 15200,
    "likes": 1023,
    "dislikes": 45,
    "uploadDate": "2024-09-20",
    "comments": [
      {
        "commentId": "comment01",
        "userId": "user02",
        "text": "Great video! Very helpful.",
        "timestamp": "2024-09-21T08:30:00Z"
      }
    ]
  },
  {
    "videoId": "video02",
    "title": "JavaScript ES6 Features Explained",
    "thumbnailUrl": "https://example.com/thumbnails/js-es6.png",
    "description": "Deep dive into modern JavaScript features including arrow functions, destructuring, and promises.",
    "channelId": "channel02",
    "uploader": "user03",
    "duration": "00:42:18",
    "views": 28750,
    "likes": 2340,
    "dislikes": 89,
    "uploadDate": "2024-08-15",
    "comments": [
      {
        "commentId": "comment02",
        "userId": "user04",
        "text": "Finally understand arrow functions now!",
        "timestamp": "2024-08-16T14:22:00Z"
      },
      {
        "commentId": "comment03",
        "userId": "user05",
        "text": "Could you make a video about async/await next?",
        "timestamp": "2024-08-17T09:15:00Z"
      }
    ]
  },
  {
    "videoId": "video03",
    "title": "CSS Grid Layout Complete Guide",
    "thumbnailUrl": "https://example.com/thumbnails/css-grid.png",
    "description": "Master CSS Grid with practical examples and real-world layouts.",
    "channelId": "channel03",
    "uploader": "user06",
    "duration": "01:15:32",
    "views": 42100,
    "likes": 3567,
    "dislikes": 123,
    "uploadDate": "2024-07-30",
    "comments": [
      {
        "commentId": "comment04",
        "userId": "user07",
        "text": "This saved me hours of struggling with flexbox!",
        "timestamp": "2024-07-31T16:45:00Z"
      },
      {
        "commentId": "comment05",
        "userId": "user08",
        "text": "Amazing explanation of grid areas",
        "timestamp": "2024-08-01T11:30:00Z"
      },
      {
        "commentId": "comment06",
        "userId": "user09",
        "text": "Can you do a video comparing Grid vs Flexbox?",
        "timestamp": "2024-08-02T20:12:00Z"
      }
    ]
  },
  {
    "videoId": "video04",
    "title": "Python for Beginners - Variables and Data Types",
    "thumbnailUrl": "https://example.com/thumbnails/python-basics.png",
    "description": "Learn the fundamentals of Python programming starting with variables and data types.",
    "channelId": "channel04",
    "uploader": "user10",
    "duration": "00:38:25",
    "views": 67890,
    "likes": 5234,
    "dislikes": 234,
    "uploadDate": "2024-06-12",
    "comments": [
      {
        "commentId": "comment07",
        "userId": "user11",
        "text": "Perfect for someone switching from Java!",
        "timestamp": "2024-06-13T10:20:00Z"
      },
      {
        "commentId": "comment08",
        "userId": "user12",
        "text": "Love the clear explanations",
        "timestamp": "2024-06-14T15:30:00Z"
      }
    ]
  },
  {
    "videoId": "video05",
    "title": "Docker Containers Explained",
    "thumbnailUrl": "https://example.com/thumbnails/docker-explained.png",
    "description": "Understanding containerization and how Docker simplifies application deployment.",
    "channelId": "channel05",
    "uploader": "user13",
    "duration": "00:52:14",
    "views": 89320,
    "likes": 7456,
    "dislikes": 445,
    "uploadDate": "2024-05-28",
    "comments": [
      {
        "commentId": "comment09",
        "userId": "user14",
        "text": "Finally get what containers are about!",
        "timestamp": "2024-05-29T12:45:00Z"
      },
      {
        "commentId": "comment10",
        "userId": "user15",
        "text": "Great real-world examples",
        "timestamp": "2024-05-30T08:20:00Z"
      },
      {
        "commentId": "comment11",
        "userId": "user16",
        "text": "Can you do Kubernetes next?",
        "timestamp": "2024-05-31T19:15:00Z"
      }
    ]
  },
  {
    "videoId": "video06",
    "title": "Node.js Express Server Setup",
    "thumbnailUrl": "https://example.com/thumbnails/node-express.png",
    "description": "Build your first web server using Node.js and Express framework.",
    "channelId": "channel06",
    "uploader": "user17",
    "duration": "00:34:56",
    "views": 34560,
    "likes": 2789,
    "dislikes": 156,
    "uploadDate": "2024-04-18",
    "comments": [
      {
        "commentId": "comment12",
        "userId": "user18",
        "text": "Step-by-step approach is perfect",
        "timestamp": "2024-04-19T13:30:00Z"
      }
    ]
  },
  {
    "videoId": "video07",
    "title": "Git and GitHub Tutorial for Teams",
    "thumbnailUrl": "https://example.com/thumbnails/git-github.png",
    "description": "Collaborative development with Git version control and GitHub workflows.",
    "channelId": "channel07",
    "uploader": "user19",
    "duration": "00:48:37",
    "views": 56780,
    "likes": 4321,
    "dislikes": 178,
    "uploadDate": "2024-03-22",
    "comments": [
      {
        "commentId": "comment13",
        "userId": "user20",
        "text": "Merge conflicts make sense now!",
        "timestamp": "2024-03-23T16:20:00Z"
      },
      {
        "commentId": "comment14",
        "userId": "user21",
        "text": "Wish I had this when I started coding",
        "timestamp": "2024-03-24T10:45:00Z"
      }
    ]
  },
  {
    "videoId": "video08",
    "title": "Machine Learning with Python - Linear Regression",
    "thumbnailUrl": "https://example.com/thumbnails/ml-linear.png",
    "description": "Introduction to machine learning algorithms starting with linear regression.",
    "channelId": "channel08",
    "uploader": "user22",
    "duration": "01:23:42",
    "views": 78910,
    "likes": 6543,
    "dislikes": 321,
    "uploadDate": "2024-02-14",
    "comments": [
      {
        "commentId": "comment15",
        "userId": "user23",
        "text": "Math explanations are crystal clear",
        "timestamp": "2024-02-15T14:30:00Z"
      },
      {
        "commentId": "comment16",
        "userId": "user24",
        "text": "Love the practical examples with real data",
        "timestamp": "2024-02-16T09:20:00Z"
      },
      {
        "commentId": "comment17",
        "userId": "user25",
        "text": "When will you cover neural networks?",
        "timestamp": "2024-02-17T18:40:00Z"
      }
    ]
  },
  {
    "videoId": "video09",
    "title": "Responsive Web Design with CSS Media Queries",
    "thumbnailUrl": "https://example.com/thumbnails/responsive-design.png",
    "description": "Create websites that look great on all devices using CSS media queries.",
    "channelId": "channel09",
    "uploader": "user26",
    "duration": "00:36:21",
    "views": 45670,
    "likes": 3890,
    "dislikes": 234,
    "uploadDate": "2024-01-30",
    "comments": [
      {
        "commentId": "comment18",
        "userId": "user27",
        "text": "Mobile-first approach finally clicked!",
        "timestamp": "2024-01-31T11:15:00Z"
      },
      {
        "commentId": "comment19",
        "userId": "user28",
        "text": "Great breakpoint examples",
        "timestamp": "2024-02-01T15:45:00Z"
      }
    ]
  },
  {
    "videoId": "video10",
    "title": "Database Design Fundamentals",
    "thumbnailUrl": "https://example.com/thumbnails/database-design.png",
    "description": "Learn the principles of good database design and normalization.",
    "channelId": "channel10",
    "uploader": "user29",
    "duration": "01:08:15",
    "views": 92340,
    "likes": 7890,
    "dislikes": 456,
    "uploadDate": "2024-01-15",
    "comments": [
      {
        "commentId": "comment20",
        "userId": "user30",
        "text": "Third normal form finally makes sense!",
        "timestamp": "2024-01-16T13:20:00Z"
      },
      {
        "commentId": "comment21",
        "userId": "user31",
        "text": "Great ER diagram examples",
        "timestamp": "2024-01-17T10:30:00Z"
      },
      {
        "commentId": "comment22",
        "userId": "user32",
        "text": "Could you cover NoSQL databases next?",
        "timestamp": "2024-01-18T16:45:00Z"
      }
    ]
  },
  {
    "videoId": "video11",
    "title": "API Development with REST Principles",
    "thumbnailUrl": "https://example.com/thumbnails/rest-api.png",
    "description": "Build robust APIs following REST architectural principles and best practices.",
    "channelId": "channel11",
    "uploader": "user33",
    "duration": "00:55:28",
    "views": 61230,
    "likes": 5120,
    "dislikes": 289,
    "uploadDate": "2023-12-20",
    "comments": [
      {
        "commentId": "comment23",
        "userId": "user34",
        "text": "HTTP methods explanation was spot on",
        "timestamp": "2023-12-21T14:25:00Z"
      },
      {
        "commentId": "comment24",
        "userId": "user35",
        "text": "Authentication section was very helpful",
        "timestamp": "2023-12-22T09:40:00Z"
      }
    ]
  },
  {
    "videoId": "video12",
    "title": "TypeScript for JavaScript Developers",
    "thumbnailUrl": "https://example.com/thumbnails/typescript-js.png",
    "description": "Smooth transition from JavaScript to TypeScript with practical examples.",
    "channelId": "channel12",
    "uploader": "user36",
    "duration": "00:44:33",
    "views": 38920,
    "likes": 3245,
    "dislikes": 167,
    "uploadDate": "2023-11-28",
    "comments": [
      {
        "commentId": "comment25",
        "userId": "user37",
        "text": "Type annotations are so much clearer now",
        "timestamp": "2023-11-29T12:15:00Z"
      },
      {
        "commentId": "comment26",
        "userId": "user38",
        "text": "Interface vs type explanation was perfect",
        "timestamp": "2023-11-30T17:30:00Z"
      },
      {
        "commentId": "comment27",
        "userId": "user39",
        "text": "Generic types next please!",
        "timestamp": "2023-12-01T08:20:00Z"
      }
    ]
  },
  {
    "videoId": "video13",
    "title": "AWS Cloud Computing Basics",
    "thumbnailUrl": "https://example.com/thumbnails/aws-basics.png",
    "description": "Getting started with Amazon Web Services - EC2, S3, and basic cloud concepts.",
    "channelId": "channel13",
    "uploader": "user40",
    "duration": "01:12:47",
    "views": 74560,
    "likes": 6234,
    "dislikes": 378,
    "uploadDate": "2023-10-15",
    "comments": [
      {
        "commentId": "comment28",
        "userId": "user41",
        "text": "Free tier explanation saved me money!",
        "timestamp": "2023-10-16T15:20:00Z"
      },
      {
        "commentId": "comment29",
        "userId": "user42",
        "text": "IAM roles were confusing until this video",
        "timestamp": "2023-10-17T11:45:00Z"
      }
    ]
  },
  {
    "videoId": "video14",
    "title": "React Hooks Deep Dive",
    "thumbnailUrl": "https://example.com/thumbnails/react-hooks.png",
    "description": "Master useState, useEffect, and custom hooks in React applications.",
    "channelId": "channel14",
    "uploader": "user43",
    "duration": "00:58:19",
    "views": 52340,
    "likes": 4567,
    "dislikes": 223,
    "uploadDate": "2023-09-30",
    "comments": [
      {
        "commentId": "comment30",
        "userId": "user44",
        "text": "useEffect cleanup finally makes sense!",
        "timestamp": "2023-10-01T13:30:00Z"
      },
      {
        "commentId": "comment31",
        "userId": "user45",
        "text": "Custom hooks section was brilliant",
        "timestamp": "2023-10-02T16:20:00Z"
      },
      {
        "commentId": "comment32",
        "userId": "user46",
        "text": "Can you cover useContext and useReducer?",
        "timestamp": "2023-10-03T10:15:00Z"
      }
    ]
  },
  {
    "videoId": "video15",
    "title": "SQL Joins Explained with Examples",
    "thumbnailUrl": "https://example.com/thumbnails/sql-joins.png",
    "description": "Master INNER, LEFT, RIGHT, and FULL OUTER joins with practical database examples.",
    "channelId": "channel15",
    "uploader": "user47",
    "duration": "00:41:56",
    "views": 83920,
    "likes": 7123,
    "dislikes": 401,
    "uploadDate": "2023-08-25",
    "comments": [
      {
        "commentId": "comment33",
        "userId": "user48",
        "text": "Venn diagrams made it so clear!",
        "timestamp": "2023-08-26T14:40:00Z"
      },
      {
        "commentId": "comment34",
        "userId": "user49",
        "text": "Finally understand the difference between LEFT and RIGHT joins",
        "timestamp": "2023-08-27T09:25:00Z"
      }
    ]
  },
  {
    "videoId": "video16",
    "title": "Web Security Best Practices",
    "thumbnailUrl": "https://example.com/thumbnails/web-security.png",
    "description": "Protect your web applications from common security vulnerabilities and attacks.",
    "channelId": "channel16",
    "uploader": "user50",
    "duration": "01:34:12",
    "views": 96780,
    "likes": 8234,
    "dislikes": 512,
    "uploadDate": "2023-07-18",
    "comments": [
      {
        "commentId": "comment35",
        "userId": "user51",
        "text": "XSS prevention techniques were eye-opening",
        "timestamp": "2023-07-19T16:30:00Z"
      },
      {
        "commentId": "comment36",
        "userId": "user52",
        "text": "OWASP Top 10 breakdown was excellent",
        "timestamp": "2023-07-20T11:15:00Z"
      },
      {
        "commentId": "comment37",
        "userId": "user53",
        "text": "Password hashing section needs more detail",
        "timestamp": "2023-07-21T14:50:00Z"
      }
    ]
  },
  {
    "videoId": "video17",
    "title": "GraphQL vs REST API Comparison",
    "thumbnailUrl": "https://example.com/thumbnails/graphql-rest.png",
    "description": "Understanding when to use GraphQL over REST APIs with practical examples.",
    "channelId": "channel17",
    "uploader": "user54",
    "duration": "00:39:28",
    "views": 47650,
    "likes": 3890,
    "dislikes": 278,
    "uploadDate": "2023-06-12",
    "comments": [
      {
        "commentId": "comment38",
        "userId": "user55",
        "text": "Over-fetching problem explanation was perfect",
        "timestamp": "2023-06-13T12:20:00Z"
      },
      {
        "commentId": "comment39",
        "userId": "user56",
        "text": "Schema definition language is intuitive",
        "timestamp": "2023-06-14T15:45:00Z"
      }
    ]
  },
  {
    "videoId": "video18",
    "title": "MongoDB Aggregation Pipeline Tutorial",
    "thumbnailUrl": "https://example.com/thumbnails/mongodb-agg.png",
    "description": "Master complex data queries using MongoDB's powerful aggregation framework.",
    "channelId": "channel18",
    "uploader": "user57",
    "duration": "01:02:35",
    "views": 35240,
    "likes": 2890,
    "dislikes": 145,
    "uploadDate": "2023-05-20",
    "comments": [
      {
        "commentId": "comment40",
        "userId": "user58",
        "text": "$lookup stage finally clicked!",
        "timestamp": "2023-05-21T10:30:00Z"
      },
      {
        "commentId": "comment41",
        "userId": "user59",
        "text": "Great performance optimization tips",
        "timestamp": "2023-05-22T14:15:00Z"
      },
      {
        "commentId": "comment42",
        "userId": "user60",
        "text": "Can you cover indexing strategies?",
        "timestamp": "2023-05-23T18:20:00Z"
      }
    ]
  }
]

  return (
    
    <div className={`grid gap-4 ${sidebarOpen
  ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"  
  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"     
} `}>
  {/* Render the cards  */}
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};


export default VideoList
