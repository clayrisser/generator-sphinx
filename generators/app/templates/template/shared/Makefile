BUILDDIR=build
SOURCEDIR=docs
SPHINXOPTS=
SPHINXPROJ=test

.PHONY: build
build: env clean html man latexpdf
	@echo ::: BUILD :::

.PHONY: serve
serve: build
	@cd build/html && ../../env/bin/python3 -m http.server

.PHONY: help
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

env:
	@virtualenv env
	@env/bin/pip3 install -r requirements.txt
	@env/bin/pip3 uninstall -y sphinx-js
	@env/bin/pip3 install git+https://github.com/jamrizzi/sphinx-js.git
	@echo ::: ENV :::

.PHONY: freeze
freeze:
	@env/bin/pip3 freeze > requirements.txt
	@echo ::: FREEZE :::

.PHONY: Makefile
%: Makefile
	@env/bin/sphinx-build -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
