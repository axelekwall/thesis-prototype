import useSWR from 'swr';
import { Repo, getRepoData } from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actions, DataState } from '../store/data';
import { State } from '../store';
import { data } from '../data/repo';

const url =
  'https://api.github.com/repos/axelekwall/thesis-prototype/git/trees/dc9a6de41436a40aaedad0204cd681965ba58df4?recursive=true';

// const fetcher = (): Promise<Repo> => fetch(url).then((r) => r.json());
const fetcher = (): Repo => data;

const options = {
  initialData: null,
};

const useData = (): DataState => {
  const { data, error } = useSWR('repo', fetcher, options);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(actions.repoDataUpdated(getRepoData(data)));
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);
  return useSelector<State, DataState>((state) => state.data);
};

export default useData;
