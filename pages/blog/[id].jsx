import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'BLOG 1',
    subtitle: 'Subtitle',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ducimus sunt maiores aspernatur provident facilis dolor, dolores quisquam praesentium, dolorum quam commodi porro similique. Dolor corporis exercitationem ex veniam blanditiis. Inventore eos cum illo voluptate velit deserunt ducimus quam distinctio, reprehenderit impedit ipsam vitae corrupti esse autem laudantium debitis repellendus ex? Iure similique obcaecati nostrum eaque officiis totam itaque fugiat. Explicabo illo blanditiis quo quia doloremque ad mollitia laborum quos voluptatum incidunt culpa veritatis vitae vero est, aperiam, id sapiente magni voluptas aliquam. Non quod, ad vel repellat distinctio sapiente?Esse suscipit facere possimus error laudantium quia fugit totam itaque, similique, nulla doloribus officiis delectus cumque quis atque nesciunt adipisci voluptas. At commodi, atque obcaecati eligendi ratione eveniet optio? Vel.Quo eos expedita culpa voluptatibus tempore aperiam assumenda facilis ab ex quibusdam sit corporis cum veniam porro suscipit consectetur aspernatur odit, accusamus libero nesciunt, quisquam iure. Culpa molestiae ducimus voluptatem.Debitis doloribus amet nemo vel, eligendi, veritatis esse animi voluptatibus voluptate enim adipisci eaque fuga earum accusamus itaque quod qui nulla? Eos dignissimos, ex necessitatibus incidunt ad atque. Labore, saepe!Consequatur velit earum corrupti harum sequi, cupiditate rerum esse enim distinctio consectetur, adipisci fugit non voluptatibus mollitia repellat illum assumenda et odio laborum impedit minima. Reprehenderit possimus expedita autem! Quod?Nemo amet quasi id. In assumenda praesentium, ab ducimus expedita ullam voluptate accusantium possimus tenetur suscipit? Expedita, vitae modi assumenda possimus sint rerum, aliquid illum optio praesentium accusantium repellendus laboriosam!Corporis iure corrupti accusantium laboriosam est reprehenderit pariatur itaque consequatur ipsam ad animi doloremque error veritatis inventore hic ipsum dolore explicabo, at suscipit. Amet, quaerat. Nesciunt labore excepturi iure neque.Consequatur magni, ducimus beatae maiores voluptates facere reprehenderit sequi optio quis porro? Laboriosam sed temporibus ab praesentium ut enim accusantium beatae delectus in? Aliquam cum natus assumenda dicta deleniti reprehenderit!Corrupti, harum est. Maxime velit in, molestias neque ab doloribus soluta illum praesentium. Quos officiis dignissimos perspiciatis placeat enim? Perspiciatis voluptas harum expedita asperiores dolorem ex et mollitia reprehenderit pariatur!Repellendus ducimus deleniti explicabo unde! Beatae aliquam recusandae explicabo distinctio provident. Quo accusamus iure facilis soluta doloremque optio velit officiis aliquam, commodi, debitis consequuntur voluptatibus rem libero reprehenderit repellendus tempora.Corporis quod molestiae saepe distinctio quis id quae atque ea natus cupiditate illo quidem consequatur quaerat itaque est inventore ex repellendus exercitationem, fugit, dolorem asperiores harum commodi, neque eius. MolestiasImpedit, eius tenetur? Perferendis a soluta, maxime obcaecati tempore ab debitis natus incidunt, magnam repellendus dignissimos voluptatem inventore, repudiandae ex laudantium? Aspernatur repellat repellendus accusamus iste nam voluptatem nisi molestiae? Soluta sed pariatur quaerat autem! Vel magnam dolorum odit quam molestiae enim debitis quibusdam illum commodi nemo, veniam consectetur autem, molestias nesciunt neque quo. Ipsum saepe doloremque quis laboriosam fugiat.',
  },
];

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;

  const requestedPost = BLOG_POSTS.find((post) => post.id == id);
  const postNotFound = requestedPost == undefined;

  return (
    <div className="container">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main align="center">
        <h1>My blog</h1>

        <p>Trying to retrieve Blog {id}</p>

        {postNotFound ? <h1>Post not found!</h1> : <h1>{requestedPost.title}</h1>}
      </main>
    </div>
  );
};

export default Blog;
