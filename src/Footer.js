function copyright(startYear) {
    const currentYear = new Date().getFullYear();
    if (startYear === currentYear) {
        return currentYear;
    }
    else {
        return `${startYear}-${currentYear}`;
    }
}

export default function Footer() {
    return (
        <div className="container">
            <hr />
            <div className="d-flex justify-content-between">
                <p>&copy; {copyright(2021)} François Karman</p>
                <p><a href="https://github.com/superfaz/origami-box" target="_blank" rel="noreferrer" className="btn btn-success"
                aria-label="View on GitHub">
                    <i className="bi bi-github"></i></a>
                </p>
            </div>
        </div>
    );
}
