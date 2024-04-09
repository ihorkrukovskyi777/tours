import parse from "html-react-parser";

function useParseCode(code) {

  const scripts = [];
  let scriptInner = "";
  const html = parse(typeof code  === 'string' ? code :  '', {
    replace: (domNode) => {
      if (domNode.name === "script") {
        scripts.push(domNode.attribs.src);
        domNode.children.forEach((item) => {
          scriptInner = scriptInner + " " + item.data;
        });
        return "";
      }
    },
  });

  return {
    scripts: scripts.filter(Boolean),
    scriptInner,
    html,
  };
}

export default useParseCode;
