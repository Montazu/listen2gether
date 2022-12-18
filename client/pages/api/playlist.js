import info from './info'

export default (req, res) => {
	res.status(200).json(info)
}