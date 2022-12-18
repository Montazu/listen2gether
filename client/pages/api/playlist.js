export default (req, res) => {
	const playlist = [
		{
			id: 1,
			title: 'Góralko',
			image: 'https://lh3.googleusercontent.com/alkmJH7B8rZnwNJ2x2Ja4wfxta0OXO4-wZA559KKouGJhcSHIQUqlNJfdxgRWxOVHgnQrArwQYCyF0V7Lg=w60-h60-l90-rj',
			url: 'https://x2convert.com/Thankyou?token=U2FsdGVkX18sTDQIU6aJVCbQYcRYfZIfCdKY%2bE1AZSQwSKNXBX4efnr3a1elY7w6eiPb7PmrZ7e0GAzjypZ1vv%2fi4cH1WSakEwH1bapAUqZSTuxWo8%2bJJLUhK24%2f3UEqanj4QXirFmqdKBWpwXxfByAuDq6u7rXzQpDIMKKy1VY%3d&s=youtube&id=&h=8076912343788754291',
		},
		{
			id: 2,
			title: 'Dziewczyna ze wsi',
			image: 'https://lh3.googleusercontent.com/SrU2uv1hUgkO--VDJO9eGVNcQ6N7WzVh7EZp-t80KC7wo6ouveE-FwMY_wGXKrblN1fKrMQ5B7kZQbJT=w60-h60-l90-rj',
			url: 'https://x2convert.com/Thankyou?token=U2FsdGVkX188MKfnJwRZ7LLO1WQDKXho6ZecHOKjhsnyL5OSb6%2fcOmMUYbp6ofcsb0Pw4zGgaw38E7UIbU0mPxR3x5FnEeChJJJjc9nn66uqEbgIBAowrIP6oq3faC1%2fBWhcyxaWMTG5fxH%2bfPV1gfOH9rOHzK7lCCog%2fZQqebP0rM6UoX0y6wHxzkxub6phezrxfqhrFn6OJvAT76Xlvg%3d%3d&s=youtube&id=&h=8076912343788754291'
		}
	]

	res.status(200).json(playlist)
}