import useSWR from 'swr';
import { Repo, getRepoData } from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actions, DataState } from '../store/data';
import { State } from '../store';
import { data as repoData } from '../data/repo';

// const url =
//   'https://api.github.com/repos/axelekwall/thesis-prototype/git/trees/dc9a6de41436a40aaedad0204cd681965ba58df4?recursive=true';
// const getRepoUrl =
//   'https://api.github.com/repos/axelekwall/thesis-prototype/commits';

// const fetcher = (): Promise<Repo> =>
//   fetch(getRepoUrl)
//     .then((r) => r.json())
//     .then((r) =>
//       fetch(
//         `https://api.github.com/repos/axelekwall/thesis-prototype/git/trees/${r[0].sha}?recursive=true`
//       )
//     )
//     .then((r) => r.json());

const fetcher = (): Repo => repoData;

const options = {
  initialData: null,
};

const useData = (): DataState => {
  const { data: repoData, error } = useSWR('repo', fetcher, options);
  const dispatch = useDispatch();
  useEffect(() => {
    if (repoData) {
      const data = getRepoData(repoData);
      dispatch(actions.repoDataUpdated(data));
    }
    if (error) {
      console.log(error);
    }
  }, [repoData, error]);
  return useSelector<State, DataState>((state) => state.data);
};

export default useData;
