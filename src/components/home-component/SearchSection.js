import { Component } from "react";
import { GrSearch } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

class SearchSection extends Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        const target = e.currentTarget;
        const head = target.querySelector('.Head');
        if (target.classList.contains("Active")) {
            target.classList.remove("Active");
            head.classList.add("Flip");
        } else {
            head.classList.remove("Flip");
            target.classList.add("Active");
        }
    }

    render() {
        return (
            <section className="SearchSection">
                <div className="SearchBar" style={{"border": this.props.state.error && "1px solid red"}}>
                    <GrSearch/>
                    <form action="" method="GET" onSubmit={this.props.handleSubmit}>
                        <input name="country" type="text" placeholder="Search for a country"onChange={this.props.handleChange} />
                    </form>
                </div>
                <div className="Filter">
                    <div className="Select Active" onClick={this.handleClick}>
                        <div className="Head">
                            <p>{this.props.state.text} </p>
                            <div className="Icon">
                                <FaAngleDown className="Down"/>
                                <FaAngleUp className="Up"/>
                            </div>
                        </div>
                        <div className="List">
                            <p onClick={this.props.handleSelect}>Africa</p>
                            <p onClick={this.props.handleSelect}>Americas</p>
                            <p onClick={this.props.handleSelect}>Asia</p>
                            <p onClick={this.props.handleSelect}>Europe</p>
                            <p onClick={this.props.handleSelect}>Oceania</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SearchSection;
