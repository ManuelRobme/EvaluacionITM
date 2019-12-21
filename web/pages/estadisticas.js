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
import { Row, Col, Container } from 'reactstrap';
import HeadImports from '../components/HeadImports';
import { auth } from '../util/auth';
import Hero from '../components/Hero';
import appFetch from '../utils/appFetch'
import { Line, Pie } from 'react-chartjs-2';
import Space from '../components/Space';
const randomFlatColors = require("random-flat-colors");



class Index extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      reports: props.reports
    }

  

    const dataPie = {}
    console.log(props.surveys)
    props.surveys.forEach(elem => {
      console.log({elem})
      for(const label of Object.keys(elem.survey)) {
        if(!isNaN(elem.survey[label])) dataPie[label] = dataPie[label] ? dataPie[label] + Number(elem.survey[label]) : Number(elem.survey[label])
      }
    })
    
    const sum = Object.values(dataPie).reduce((a, b) => a +b )
    console.log(sum)

    const colors = Object.keys(dataPie).map(elem => randomFlatColors(['blue', 'teal', 'green', 'purple', 'yellow', 'orange', 'red']))

    console.log(dataPie, Object.values(dataPie).map(elem => elem/sum))    
    this.reportTypes = {
      labels: Object.keys(dataPie),
      datasets: [{
        data: Object.values(dataPie).map(elem => elem/props.surveys.length),
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }]
    };

    console.log( this.reportTypes )

  }


  static async getInitialProps(ctx) {
    // const { token } = validateUser(ctx, ADD_LOCATION_PERMISSION)
    try {

      const response = await appFetch("/api/surveys/", {
        method: 'GET',
      })


      if (response.surveys) {
        return { surveys: response.surveys }
      }
    } catch (err) {
      console.log(err)
    }
    return { surveys:  [] }
  }


  componentDidMount() {


  }




  render() {
    return <Layout>
      <Header />
      <Container>
        <Row>

          <Col>
            <Space size="md" />
            <h2 className="text-center">Estadísticas</h2>
          </Col>
        </Row>
        <Row>
            <Col>
            <Space size="md" />
  <h3 className="text-center">Cantidad de encuestas: {this.props.surveys.length}</h3>
          </Col>

          {/* <Col xs="12" lg="6" className="mx-auto">

            <Line data={this.reportsMonths} />
          </Col> */}
          <Col xs="12" lg="12" className="mx-auto">

            <Pie data={this.reportTypes} />
          </Col>

        </Row>
      </Container>
      <Footer />
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
