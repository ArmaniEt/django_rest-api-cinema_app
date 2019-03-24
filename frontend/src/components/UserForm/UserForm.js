import React, {Fragment, Component} from 'react'


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.personalData
    }


    render() {
        if (this.state.user) {
            const{email, first_name, last_name, password} = this.state.user;
            return <Fragment>
                <form>
                    <div className="form-group">
                        <label className="font-weight-bold">Имя</label>
                        <input className="form-control" type="text" name="name" value={name}
                               onChange={this.inputChanged}/>
                        {this.showErrors('name')}
                    </div>
                </form>
            </Fragment>

        }

    }

}

export default UserForm;

