import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import { getSortedSubsData } from '../lib/subs';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allSubsData = await getSortedSubsData();
  return {
    props: {
      allPostsData,
      allSubsData,
    },
  };
}

export default function Home({ allPostsData, allSubsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>From professional dancer to software engineer, I’m interested in ways technology can help humans be more human. Currently working in the FinTech space.</p>
        <em>THIS IS A TEST CHANGE 2 FOR VERCEL.</em>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Subscribers</h2>
        <ul className={utilStyles.list}>
          {allSubsData.map(({ login, name, picture }) => (
            <li className={utilStyles.listItem} key={login.uuid}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  priority
                  src={picture.medium}
                  height={50}
                  width={50}
                  alt=""
                />
                <Link href={`/subs/${login.uuid}`}>{name.first} {name.last}</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
