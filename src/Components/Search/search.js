import React from 'react';
import './Style.css'
import axios from 'axios'
import Display from './Display'

class Search extends  React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			            query: '',
                        results: {},
                        results1:{},
                        loading: false,
                        
        };
        this.cancel = ""
    }
    handleOnInputChange = (event) => {
        const query = event.target.value;
        if ( ! query ) {
           // this.setState({ query, results: {}, message: '' } );
           this.setState({ query, loading: true}, () => {
               if(query.length < 1)
                this.fetchClickResults();
           });
        } else {
            
            this.setState({ query, loading: true}, () => {
               if(query.length >= 3  ) 
                this.fetchSearchResults(query);
            });
        }
    }
    fetchClickResults = () => {
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios
            .get("https://asia-east2-zoncolan-982ad.cloudfunctions.net/api/videos?q=tou&start=0&num=20",{
                cancelToken: this.cancel.token
              })
            .then((res) => {
                this.setState({results1 : res.data.suggestions, results:""})
                //console.log(res.data.suggestions)
           })
    }
    fetchSearchResults = (query ) => {
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios
            .get("https://asia-east2-zoncolan-982ad.cloudfunctions.net/api/videos?q=tou&start=0&num=20",{
                cancelToken: this.cancel.token
              })
            .then((res) => {
                this.setState({results : res.data.videoMetaData, results1 : ""})
           })    
        };
    renderSearchResults = () => {
        const {results} = this.state;
        if (results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                         <div className="subcontainer">   
                        <h2>{result.title}</h2>
                        <p>{result.description}</p>
                        <div className="imagewrapper">
                        <img src="https://img.youtube.com/vi/Dtu_nfT1_cQ/hqdefault.jpg" alt="cycle"></img>
                        </div>
                        <h2>{result.displayorder}</h2>
                        </div>
                        );
                    })}
                </div>
            );
        }
    };
    renderClickResult = () => {
        const {results1} = this.state;
        if (results1.length) {
            return (
                <div className="click-container">
                 {results1.map((result) => {
                     return (
                        <div className="clicksubcontainer">
                         <h4>{result}</h4>
                        </div>    
                     )
                 })}
                </div>
            )
        }
    }
    handleclick = () => {
        this.setState({
            results1: ""
        })
    }
	render() {
          return (
			<div className="container" onClick={this.handleclick}>
				{/*Heading*/}
				<h2 className="heading"><span className="title">GCN</span></h2>
				{/*Search Input*/}
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={this.state.query}
						id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                        onClick={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon"/>
                   
                    <Display list = {this.renderClickResult}  list1={this.renderSearchResults} />
                 
                    </label>
			</div>
			)
	}
}
export default Search;