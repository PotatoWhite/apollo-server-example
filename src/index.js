import { ApolloServer, gql } from "apollo-server";
import { filter, find } from "lodash";

let books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

let typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Author {
    name : String
    title: String
  }

  type Query {
    allbooks: [Book]
    allauthors: [Author]
    findbook(title:String): [Book]
  }
`;

const getAllBooks = () => books;
const getAllAuthors = () => {
  return books.map((book) => {
      return {
          name : book.author,
          title : book.title
      };
  });
};

const getBooksByTitle = title => {
  console.log(title);
  return books.filter(book => book.title == title);
};

let resolvers = {
  Query: {
    allbooks: getAllBooks,
    allauthors: getAllAuthors,
    findbook : (_, {title}) => {
        return getBooksByTitle(title);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4040).then(({ url }) => {
  console.log(`sever running at ${url}`);
});
