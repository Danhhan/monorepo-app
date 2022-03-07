# 🛠 PWA Monorepo - Troubleshooting Guide

These instructions will show you how to resolve some trouble when contribute to this project.

### Trouble: Error from chokidar (error: watch ENOSPC)

To resolve, run command:

```sh

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

```
