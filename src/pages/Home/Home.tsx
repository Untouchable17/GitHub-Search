import { FC, useState, useEffect } from "react";

import { useSearchUsersQuery, useLazyGetUserReposQuery } from "../../store/github/github.api";
import {useDebounce } from "../../hooks/debounce";


const Home: FC = () => {

	const [search, setSearch] = useState("")
	const [dropdown, setDropDown] = useState(false)
	const debounced = useDebounce(search)
  	const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
  		/* переименование через data: users */
  		skip: debounced.length < 3,
  		refetchOnFocus: true
  	})

  	const [
  		fetchRepos, { isLoading: areReposLoading, data: repos }
	] = useLazyGetUserReposQuery()


	useEffect(() => {
		setDropDown(debounced.length > 3 && data?.length! > 0)
	}, [debounced])

	const clickHandler = (username: string) => {
		fetchRepos(username)
	}

	return (
		<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
			{ isError && <p className="text-center text-red-600">Somethin went wrong...</p>}

			<div className="relative w-[560px]">
				<input 
					type="text" name="" id="" 
					className="border py-2 px-4 w-full h-[42px] mb-2" 
					placeholder="search for github username.."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
					{isLoading && <p className="text-center">Loading...</p>}
					{ data?.map(user => (
						<li key={user.id} onClick={() => clickHandler(user.login)} className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"> {user.login }</li>
					)) }
				</ul>}
			</div>

			<div className="container">
				{ areReposLoading && <p className="text-center">Repos are loading..</p>}
				{ repos?.map(repo => <p>{repo.url}</p>)}
			</div>

		</div>
	)
}

export default Home;