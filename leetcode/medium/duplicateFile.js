function findDuplicate(paths) {
  const contents = {};
  for (const directory of paths) {
    const parts = directory.split(' ');
    const dir = parts[0];
    for (const file of parts) {
      if (file === dir) continue;
      let [filename, content] = file.split('(');
      content = content.substring(0, content.length - 1);

      contents[content] = [...(contents[content] || []), [dir,filename].join('/')];
    }
  }

  let groups = [];
  for (const key in contents) {
    if (contents[key].length > 1) {
      groups = [...groups, contents[key]];
    }
  }
  return groups;
};

console.log(findDuplicate(["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]));
