const handleRegister = (req, res, bcryptjs, dbaseSql) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    const hashedPasswd = bcryptjs.hashSync(password)
    dbaseSql.transaction(trx => {
        trx('login')
            .insert({
                hash: hashedPasswd,
                email: email,
            })
            .returning('idlogin')
            .then( returnedId => {
                return trx('users')
                    .insert({
                        name: name,
                        email: email,
                        joined: new Date(),
                        idlogin: returnedId[0],
                    })
                    .returning('*')
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err =>
            res.status(400).json('Unable to register')
        )
}

module.exports = {
    handleRegister
}