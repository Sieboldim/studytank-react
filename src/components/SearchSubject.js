/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import ax from './api';
import { Col, Row, Container } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './FilterList.css';
import './Link.css';
import Typography from '@material-ui/core/Typography';
import Fuse from 'fuse.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class SearchUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      results: [],
      search: ''
    };
  }

  onSearch(e){
    var search = e.target.value.toLowerCase();
    this.setState({ search: search });
    if(search.length > 0){
      var options = {
        shouldSort: true,
        tokenize: true,
        findAllMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: [
          "title",
          "content",
          "author",
          "authorFirstname",
          "authorLastname",
          "subject",
          "school",
          "language",
          "textbook",
          "folder"
        ]
      };
      var fuse = new Fuse(this.state.notes, options);
      var results = fuse.search(search);
      this.setState({ results: results });
    }
    else{
      this.setState({ results: this.state.notes });
    }
  }

  componentDidMount(){
    let that = this;
    ax.get('/note/_design/search/_view/search?key="'+ this.props.id +'"')
    .then((result) => {
      var notes = [];
      for(var i = 0; i < result.data.rows.length; i++){
        var row = result.data.rows[i];
        var note = row.value;

        var stars = '';
        var r = note.overallRating;
        for(var m = 0; m < 5 ;m++){
          if (r > m){
            stars +="★";
          }
          else{
            stars +="☆";
          }
        }
        note.rating = stars;
        notes.push(note);
      }

      ax.get('/group/_design/search/_view/search?key="'+ this.props.id +'"')
      .then((res) => {
        for(var i = 0; i < res.data.rows.length; i++){
          var row = res.data.rows[i];
          var group = row.value;
          notes.push(group);
        }
        console.log(notes);
        that.setState({notes: notes});
        that.setState({results: notes});
      });
    });
  }

  render() {
    return (
      <Container>
      <br/>
      <Row>
        <Col xs={{ size: 12 }}>
          <Typography variant="display1" gutterBottom>Browsing: {this.props.id}</Typography>
            <TextField
              id="userInput"
              label={"Filter \""+this.props.id+"\" Results"}
              variant="outlined"
              type="search"
              margin="normal"
              className="filter"
              onChange={this.onSearch.bind(this)}
              fullWidth
              autoComplete='off'
              value={this.state.search}
            />
  			</Col>
        <Col md={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
          <Button variant='contained' color='primary'
          component={Link} to={`/subjectlist`}
          fullWidth className='lightlink'>Browse All Subjects </Button>
        </Col>
      </Row>
      <br/>
        <Grid container spacing={24}>
          {this.state.results.map(result =>
            <Grid item xs={12} key={result.id}
            component={Link} to={result.rating ? `/note/${result.id}` : `/group/${result.id}`}
            className='darklink'>
              <Paper
                style={{margin: '2px', padding: '20px'}}
              >
                  <Typography variant="headline">{result.title}</Typography>
                    {result.author &&
                      <Typography variant="subheading">{result.authorFirstname + ' ' + result.authorLastname}</Typography>}
                    {result.rating &&
                      <Typography variant="subheading">{result.rating}</Typography>}
                    {result.followers &&
                      <Typography variant="subheading">{result.followers + ' Followers'}</Typography>}
                    <Typography variant="subheading">Subject: {result.subject}</Typography>
                    {result.school != '' &&
                      <Typography variant="subheading">School: {result.school}</Typography>}
              </Paper>
            </Grid>
            )}
          </Grid>
  			</Container>
    );
  }
}
