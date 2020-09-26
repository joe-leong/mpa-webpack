module.exports = function (source) {
  const job = `const tag = document.createElement('style')
        tag.innerHTML = ${source}
        document.head.appendChild(tag)
    `;
  return job;
};
