import Link from 'next/link'
import withLayout from '../components/Layout';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
    
      <Link href="/">
        <a>Index</a>
      </Link>
      <p>This is the about page</p>
    </Layout>
  )
}

export default About