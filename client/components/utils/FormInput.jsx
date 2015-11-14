// https://github.com/ryanswapp/react-meteor-template


AuthErrors = React.createClass({
    propTypes: {
        errors: React.PropTypes.object
    },
    render() {
        var str = [];

        if (!_.isEmpty(this.props.errors)) {
            _.forEach(this.props.errors, function (_i) {
                str.push(_i);
            })

            return  (
                <ul className="list-group">
                    <li className="list-group-item alert alert-danger">{str.join(", ")}</li>
                </ul>
            );
        } else {
            return (<span></span>);
        }
    }
});


FormInput = React.createClass({
    propTypes: {
        hasError: React.PropTypes.bool,
        label: React.PropTypes.string,
        type: React.PropTypes.string,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        data: React.PropTypes.array,
        onKeyUp: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },
    shouldComponentUpdate() {
        return true;
    },
    render() {
        const {type, label, name, value, onKeyUp, onBlur } = this.props;
        let inputType;

        var className = "form-group";
        if (this.props.hasError) {
            className += " has-error";
        }

        switch (type) {
            case "select":
                var options = [];
                let optionsData = this.props.data;

                optionsData.forEach(function (_data, _index) {
                    options.push(
                        <option key={_index} value={_data.value}>{_data.name}</option>
                    );
                });
                inputType = (
                    <select className="form-control" name={ name.toLowerCase() } onBlur={ onBlur }>
                        { options }
                    </select>
                );
                break;
            case "textarea":
                inputType = (
                    <textarea type={ type } className="form-control" name={ name.toLowerCase() } placeholder={ name }
                              defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }></textarea>
                );
                break;
            default:
                inputType = (
                    <input type={ type } className="form-control" name={ name.toLowerCase() } placeholder={ label }
                           defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }/>
                );
                break;
        }


        return (
            <div className={ className }>
                { label === "none" ? "" : <label htmlFor={ name.toLowerCase() }
                                                 className="control-label">{ label }</label> }
                { inputType }
            </div>
        )

    }
});