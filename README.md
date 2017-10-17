# Candidate search

This is your chance to showcase your frontend engineering skills on a small project.

Please be aware that this engineering showcase is not just a programming exercise. You should make sure that we get an idea of how you tackle a real-life task.
To do so describe what you did and what you decided with regard to

- requirements / assumptions
- technical concepts and technology choice
- programming
- tests
- deployment / building (including how we should build the project)
- technical documentation

We are aware that the time for this task is limited and you don't have to go into excruciating detail, but two or three concise lines per topic will make our impression much clearer. Feel free to add other things that you want to communicate.

Any documentation you create should be in this repository and in text or markdown format, don't send us Microsoft Word files or likewise. Start with a index.md document and either put everything into that file or point to other files from there.

Use `git` as you would in a project, make small, meaningful commits - and it's totally ok if you later on change stuff again, you don't need to create a cleansed, linear history.
To begin clone the repo by `git clone https://bitbucket.org/K15t/frontend-candidate-search.git`.
Once you are done, bundle the git repository into a file by typing `git bundle create candidate-search.bundle master` and send it to us.

## Task

Create a UI for displaying search results from multiple sources, e.g.[wikipedia](https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json&srsearch=QUERY) or [duckduckgo](http://api.duckduckgo.com/?q=QUERY&format=json).
You can use any other apis like bing, google etc..

You should make sure that any API you use is not called more than once per second.

There is a UI spec candidatesearch_spec/index.html file to give you an idea of what the result should look like.

We recommend you to use create-react-app, but you can start from scratch if you want to use something different.
Tests are recommended.
