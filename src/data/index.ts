export interface Repo {
  tree: Array<FileNode>;
}

export interface FileNode {
  type: 'blob' | 'tree';
  children?: Array<FileNode>;
  path: string;
  pathArray: Array<string>;
  level: number;
  url: string;
  sha: string;
  size?: number;
}

const getFileNodeChildren = (
  tree: Array<FileNode>,
  node: FileNode
): FileNode => {
  if (node.type === 'blob') return node;
  const children = tree
    .filter(
      (leaf) =>
        leaf.pathArray[node.level] === node.pathArray[node.level] &&
        leaf.level === node.level + 1
    )
    .map((leaf) => getFileNodeChildren(tree, leaf));
  return {
    children,
    ...node,
  };
};

export const getRepoData = (repo: Repo): Array<FileNode> => {
  const repoTree = repo.tree
    .filter(
      (node) =>
        !node.path.includes('.png') &&
        !node.path.includes('.jpg') &&
        !node.path.includes('.lock')
    )
    .map((node) => ({
      ...node,
      pathArray: node.path.split('/'),
      level: node.path.split('/').length - 1,
    })) as Array<FileNode>;
  let data = repoTree.filter((node) => node.level === 0);
  data = data.map((node) => getFileNodeChildren(repoTree, node));
  return data;
};
