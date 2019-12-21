import Link from 'next/link'
import withLayout from '../components/Layout';
import Layout from '../components/Layout';
import Header from '../components/Header';

import { Button } from 'reactstrap';
import SectionJumbotron from '../components/SectionJumbotron';
import SectionCards from '../components/SectionsCards';
import SectionKeyFeatures from '../components/SectionsKeyFeatures';
import Footer from '../components/Footer';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import Router from 'next/router'
import ReactLoading from 'react-loading';
import { Row, Col } from 'reactstrap';
import HeadImports from '../components/HeadImports';
import { auth } from '../util/auth';
import Hero from '../components/Hero';

class Index extends React.Component {


  static async getInitialProps(ctx) {
    //const token = auth(ctx)
    
    return {}
}

  constructor(props){
    super(props);
  }

  componentDidMount(){
   
    
  }


  
  render(){
    return  <Layout>
      <Header/>
      <Hero/>
      <Footer/>
    </Layout>

  }


  
}

function mapStateToProps(state) {
  return { ...state.app }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
