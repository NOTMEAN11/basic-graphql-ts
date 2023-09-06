const books = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const typeDefs = `#graphql
   
    type Book {
        id: ID
        title: String
        author: String
    }


    type Query {
        books: [Book]
        addBooks: [Book]
    }

    type Mutation {
        addBooks(title: String, author: String): [Book]
        updateBooks(id: ID, title: String, author: String): [Book]
        deleteBooks(id: ID): [Book]
    }
`;

export const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBooks: (_parent: any, args: { title: string; author: string }) => {
      const newBook = {
        id: books.length + 1,
        title: args.title,
        author: args.author,
      };
      books.push(newBook);
      return books;
    },
    updateBooks: (
      _parent: any,
      args: { id: number; title: string; author: string }
    ) => {
      const book = books.find((book) => book.id === Number(args.id));
      if (book) {
        book.title = args.title;
        book.author = args.author;
      }
      return books;
    },
    deleteBooks: (_parent: any, args: { id: number }) => {
      const book = books.find((book) => book.id === Number(args.id));
      if (book) {
        books.splice(books.indexOf(book), 1);
      }
      return books;
    },
  },
};
