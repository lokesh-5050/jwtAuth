exports.homePage = (req,res,next) =>{
    const user = req.user
    res.render("homepage" , {})
}