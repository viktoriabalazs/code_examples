import React, { Component, Fragment } from "react";
import { withContext } from "../../containers/CommissionerResourceCentreContainerAdmin";
import { Delete, handlerFactory, Wrapper } from "./Utils";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
    faUpload,
    faDownload,
    faEdit,
    faFileWord,
    faFilePdf,
    faFile
} from "@fortawesome/fontawesome-free-solid";

const [sectionHandler, fileHandler] = handlerFactory(
    "/api/documents_sections/",
    "/api/documents_files/"
);

const uploadHandler = (props, state) => {
    const form = new FormData();
    Object.entries(state.form).forEach(([k, v]) => {
        form.append(k, v);
    });
    return fetch("/upload_aqp_documents/", {
        method: "POST",
        body: form,
        headers: {
            "X-CSRFToken": csrf_token,
            credentials: "same-origin"
        }
    });
};

const get_icon = ext => {
    switch (ext) {
        case "PDF":
            return faFilePdf;
        case "DOCX":
            return faFileWord;
        default:
            return faFile;
    }
};

function File({
    id,
    title,
    order,
    size,
    ext,
    created,
    url,
    sectionID,
    children
}) {
    return (
        <div className="callout document-centre__document">
            <div className="document-centre__document__icon">
                <FontAwesomeIcon icon={get_icon(ext)} />
            </div>
            <div
                className="document-centre__document__title"
                data-equalizer-watch
            >
                {title}
            </div>
            <div className="document-centre__document__text">
                {size} | {ext}
                <br />
                {created}
            </div>
            {children}
        </div>
    );
}

function FileList({ files, sectionID, admin }) {
    return (
        <div className="row" data-equalizer>
            {files.map(file => (
                <div className="small-6 medium-4 large-3 xxxlarge-2 columns end">
                    <File
                        key={file.id}
                        sectionID={sectionID}
                        handler={fileHandler.update}
                        {...file}
                    >
                        <a
                            className="button button--icon small document-centre__document__button"
                            href={file.url}
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faDownload} />Download
                        </a>
                    </File>
                </div>
            ))}
        </div>
    );
}

class Documents extends Component {
    state = { active: 1 };

    render() {
        const { documents: data } = this.props;
        const { active } = this.state;
        const current = data.find(x => x.order === active);
        return (
            <div>
                <div className="faq__navigation row">
                    {data.map(x => (
                        <div className="small-4 medium-3 large-2 columns">
                            <h2
                                key={x.id}
                                onClick={() =>
                                    this.setState({ active: x.order })
                                }
                                className={`faq__navigation__button ${
                                    x.order === active ? "active" : ""
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
            </div>
        );
    }
}

export default Documents;
