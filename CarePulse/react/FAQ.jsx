import { Component } from "react";
import React from "react";
import { Section } from "./Components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";

const [sectionHandler] = handlerFactory("/api/faq_sections/");

const ContextButton = withContext(Wrapper);
const ContextSection = withContext(Section);

export default class FAQ extends Component {
    state = { active: null };
    render() {
        const { data } = this.props;
        let { active } = this.state;
        if (!active) {
            active = data[0]?.id;
        }
        const current = data.find(x => x.id === active);
        return (
            <div>
                <div className="button-group small section-button">
                    <ContextButton
                        handler={sectionHandler.create}
                        name="Add section"
                        icon={faPlus}
                        inputs={[
                            { name: "order", type: "number" },
                            { name: "title", type: "text" },
                            { name: "icon", type: "text" }
                        ]}
                    />
                </div>
                <div className="faq__navigation row">
                    {data.map(x => (
                        <div className="small-4 medium-3 large-2 columns">
                            <h2
                                key={x.id}
                                onClick={() => this.setState({ active: x.id })}
                                className={`faq__navigation__button ${
                                    x.id === active ? "active" : ""
                                }`}
                            >
                                <span className="faq__navigation__icon">
                                    <FontAwesomeIcon icon={x.icon} />
                                </span>
                                {x.title}
                            </h2>
                        </div>
                    ))}
                </div>
                {current && (
                    <div className="row">
                        <ContextSection
                            key={current.order}
                            questions={current.questions}
                            title={current.title}
                            icon={current.icon}
                            order={current.order}
                            id={current.id}
                        />
                    </div>
                )}
            </div>
        );
    }
}
