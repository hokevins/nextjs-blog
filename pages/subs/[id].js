import Head from 'next/head';
import Image from 'next/image';
import Date from '../../components/date';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllSubIds, getSubData } from '../../lib/subs';

export async function getStaticPaths() {
  const paths = await getAllSubIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const subData = await getSubData(params.id);
  return {
    props: {
      subData,
    },
  };
}

export default function Sub({ subData }) {
  const name = `${subData.name.first} ${subData.name.last}`
  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>Subscriber: {name}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={subData.dob.date} />
        </div>
        <Image
          priority
          src={subData.picture.large}
          height={150}
          width={150}
          alt=""
        />
      </article>
    </Layout>
  );
}
