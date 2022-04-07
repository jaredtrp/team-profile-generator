class Engineer {
  constructor(name, id, email, github) {
    (this.name = name),
      (this.id = id),
      (this.email = email),
      (this.github = github),
      (this.role = 'engineer');
  }
}

module.exports = Engineer;
