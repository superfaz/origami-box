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
            <p>&copy; {copyright(2021)} François Karman</p>
        </div>
    );
}
