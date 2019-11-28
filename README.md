<h3 align="center">
    <b>tarch</b>
</h3>
<p align="center">
 A Twitter Archiver
</p>
<h5 align="center">
    <a href="https://github.com/mohfunk/tarch/releases">Download</a>
</h5>
This tools archives a twitter account, written to archive my deceased cousin's twitter account.

Contributions welcome.

### Usage

```shell
    λ tarch @[handle]
    λ tarch @[handle] --from [yy/mm/dd] --to [yy/mm/dd]
```

### Build

_Please use **[yarn](https://yarnpkg.com/lang/en/)**_

##### Clone and Install

```shell
    λ git clone https://github.com/mohfunk/tarch.git
    λ cd tarch
    λ yarn
```

##### **Bundle**

```shell
    λ yarn bundle
```

##### **Install**

just copy the tarch binary file to any path on your **`$PATH`** enviorment variable

for more info on **`$PATH` :**

- **[Unix](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/)**
- **[Windows](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)**

**Optionally**, create a **`~/.bin/`** folder and add it to your **`$PATH`** enviorment variable, then :

```shell
    λ mkdir -p ~/.bin # creates the directory in your user folder, make sure ~/.bin/ is in your $PATH variable.
    λ yarn bin # copies the chlog executable to your ~/.bin folder
```
