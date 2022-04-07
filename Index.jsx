import React, { Component, Fragment, } from 'react'
import { Table, Card, Form, Alert, InputGroup } from "react-bootstrap";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { data } from '../data'

export class index extends Component {
    render() {
        return (
            <div>
                <ProductTable />
            </div>
        )
    }
}

export default index

class ProductTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filtered: data,
            searchText: ""
        }
    }
    onChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    productFilter = () => {
        this.setState({
            filtered: this.state.filtered.filter(item => {
                if (item.Title.includes(this.state.searchText)) {
                    return item;
                }
            })
        })
    }
    render() {
        return (
            <Card>
                <Search searchText={this.state.searchText} onChange={this.onChange} productFilter={this.productFilter} />
                <Table bordered striped>
                    <TableBody data={this.state.filtered} />
                </Table>
            </Card>
        )
    }
}
class Search extends Component {
    constructor(props) {
        super(props)


    }
    render() {
        return (
            <Card.Header>
                <InputGroup>
                    <Form.Control placeholder="search" value={this.props.searchText} onChange={this.props.onChange} />
                    <InputGroup.Text onClick={this.props.productFilter}>Go</InputGroup.Text>
                </InputGroup>
            </Card.Header>
        )
    }
}
class Catergory extends Component {
    render() {
        let catergory = [];
        let prevCatergory = null
        const sort = data.forEach((elem, index) => {

            if (elem.catergory !== prevCatergory) {
                catergory = [...catergory, elem.catergory]
            }
            prevCatergory = elem.catergory
        });
        return (
            <>
                <TableBody catergory={catergory} />
            </>
        )
    }
}
class TableBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }

    }

    Done = (idx) => {
        const newData = this.state.data.map((item, index) => {
            if (index === idx) {
                item.Times = item.Times - this.state['num${idx']

            }
            return item
        })
        this.setState({
            data: newData,
            ['num${idx']: 0
        })
    }
    render() {
        return (
            <>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Canceled</th>
                        <th>Times</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.data.map((item, idx) => (
                            <Fragment key={idx}>
                                <tr >
                                    <td>{item.Date}</td>
                                    <td>{item.Title}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.Completed ? 'true' : 'false'}</td>
                                    <td>{item.Canceled ? 'true' : 'false'}</td>
                                    <td>{item.Times}</td>
                                    <td>
                                        <InputGroup>
                                            <Form.Control placeholder="How many times have you done this" type="number"
                                                value={this.state.num}
                                                onChange={(event) => {
                                                    this.setState({
                                                        ['num${idx}']: event.target.value
                                                    })
                                                }
                                                }
                                            />
                                            <InputGroup.Text onClick={() => this.Processing(idx)}>Done</InputGroup.Text>
                                        </InputGroup>
                                        {
                                            +this.state['num${idx}'] <= 1 &&
                                            <Alert variant="danger">Invalid number</Alert>
                                        }
                                        {
                                            +this.state['num${idx}'] > +item.Times &&
                                            <Alert variant="danger">Already Done</Alert>
                                        }
                                    </td>


                                </tr>
                            </Fragment>
                        ))
                    }
                </tbody>
            </>
        )
    }
}


