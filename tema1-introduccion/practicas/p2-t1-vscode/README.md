---
layout: default
title: p2-t1-vscode
permalink: /tema1-introduccion/practicas/p2-t1-vscode/
previous:
  url: /tema1-introduccion/practicas/p1-t1-iaas/
next:
  url: /tema1-introduccion/practicas/p2-t1-c3-file-system/
---

# Descripción de la Práctica p2-t1-vscode

## Objetivos

1. Instale VSCode en su máquina
2. Siga los tutoriales de VSCode
2. Instale el plugin SSH FS y aprenda a usarlo con el sistema de archivo de una máquina remota via SSH
3. Use Live Share para colaborar con un compañero (Puede a ir a Settings del repo y añadirlo como collaborator de manera que pueda hacer algún commit)
4. Elabore un informe con la experiencia adquirida

## Tutoriales

### Guía de Usuario
<ul id="editor-articles" class="collapse ">
    <li >
      <a href="https://code.visualstudio.com/docs/editor/codebasics" >Basic Editing</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/extension-gallery" >Extension Marketplace</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/intellisense" >IntelliSense</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/editingevolved" >Code Navigation</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/refactoring" >Refactoring</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/debugging" >Debugging</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/versioncontrol" >Version Control</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/integrated-terminal" >Integrated Terminal</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/multi-root-workspaces" >Multi-root Workspaces</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/tasks" >Tasks</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets" >Snippets</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/emmet" >Emmet</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/command-line" >Command Line</a>
    </li>
  
    <li >
      <a href="https://code.visualstudio.com/docs/editor/accessibility" >Accessibility</a>
    </li>
  
</ul>

###  Collaboration con Visual Studio Share

- [Introducing Visual Studio Live Share](https://code.visualstudio.com/blogs/2017/11/15/live-share)
- <a href="https://youtu.be/fWXe1HQ1wVA" target="_blank">Vídeo Visual Studio Live Share Demo on VS Code</a>

### Remote - SSH: Editando con VSCode en una máquina remota via SSH 

{% include remote-ssh.md %}

### Multi-Root Worksapces

- [Multi-Root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces)

### Using React in VSCode

- [Using React in VSCode](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)

### Integrate with External Tools via Tasks

- [Integrate with External Tools via Tasks](https://code.visualstudio.com/docs/editor/tasks)


### Web Bookmarks

- <a href="https://marketplace.visualstudio.com/items?itemName=alu0100997910.webbookmarks" target="_blank">MarketPlace: Web Bookmarks a VSCode Extension by Alejandro Gonzalez Alonso</a> 
- <a href="https://marketplace.visualstudio.com/items?itemName=alu0100997910.webbookmarks" target="_blank">GitHub Repo: Web Bookmarks a VSCode Extension by Alejandro Gonzalez Alonso</a> 

## Localización del Fichero de Configuración `settings.json`

Depending on your platform, the user settings file is located here:

- Windows %APPDATA%\Code\User\settings.json
- macOS $HOME/Library/ApplicationSupport/Code/User/settings.json
- Linux $HOME/.config/Code/User/settings.json
- The workspace setting file is located under the .vscode folder in your root folder.