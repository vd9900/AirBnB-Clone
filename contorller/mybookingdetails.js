function mybookingsdetailsGET(req, res) {
    res.sendFile(path.join(__dirname, "../views/bookingdeatils.html"))
}
module.exports = { mybookingsdetailsGET }