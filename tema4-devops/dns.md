# DNS


* [How to Set DNS Nameservers on Ubuntu 18.04](https://linuxize.com/post/how-to-set-dns-nameservers-on-ubuntu-18-04/)

Back in the days, whenever you wanted to configure DNS resolvers in Linux you would simply open the `/etc/resolv.conf` file, edit the entries, save the file and you are good to go. 

This file still exists but it is a [symlink](https://linuxize.com/post/how-to-create-symbolic-links-in-linux-using-the-ln-command/) controlled by the systemd-resolved service and **should not be edited manually**.

## Netplan

Netplan configuration files are stored in the `/etc/netplan` directory. You’ll probably find one or two YAML files in this directory. The file name may differ from setup to setup. Usually, the file is named either `01-netcfg.yaml` or `50-cloud-init.yaml` but in your system, it may be different.

## /etc/netplan

```
usuario@ubuntu:/etc/netplan$ pwd -P
/etc/netplan
usuario@ubuntu:/etc/netplan$ ls -l
total 8
-rw-r--r-- 1 root root 485 abr 24 11:09 01-netcfg.yaml
-rw-r--r-- 1 root root 241 abr 24 11:04 01-netcfg.yaml-initial
usuario@ubuntu:/etc/netplan$
```

## Some DNS resolvers

Below are some of the most popular public DNS resolvers:

```
Google (8.8.8.8, 8.8.4.4)
Cloudflare (1.1.1.1 and 1.0.0.1)
OpenDNS (208.67.222.222, 208.67.220.220)
Level3 (209.244.0.3, 209.244.0.4)
```

## Editing /etc/netplan/01-netcfg.yaml

To configure the DNS servers we open the interface configuration file with our editor:

```
sudo vi /etc/netplan/01-netcfg.yaml
```

```yml
network:
  version: 2
  renderer: networkd
  ethernets:
    ens3:
      dhcp4: no
      addresses:
        - 192.168.121.199/24
      gateway4: 192.168.121.1
      nameservers:
          addresses: [8.8.8.8, 8.8.4.4]
```

## sudo netplan apply

```
$ sudo netplan apply
```

Netplan will generate the configuration files for the `systemd-resolved` service.

## systemd-resolve

To verify that the new DNS resolvers are set, run the following command:

```
systemd-resolve --status | grep 'DNS Servers' -A2
```

`systemd-resolve -status` prints a lot of information.
We are using `grep` to filter the `'DNS Servers'` string. 

The output will look something like this:

```
usuario@ubuntu:/etc/netplan$ systemd-resolve --status | grep 'DNS Servers' -A4
         DNS Servers: 8.8.8.8
                      8.8.4.4
                      1.1.1.1
                      1.0.0.1
                      209.244.0.3
```

## Servidores DNS en la ULL

En el caso de máquinas del iaas.ull.es los servidores DNS deberán ser los de la ULL. 

Pueden averiguarse cuales son esos DNS dependiendo de cual sea el O.S.. 

### O.S. viejo

En tomas1, con un O.S viejo:

```
usuario@ubuntu:~$ cat /etc/resolv.conf
nameserver 10.4.9.30
nameserver 10.4.9.29
```

### /var/systemd/resolve

En una máquina con IP dinámica:

```
[~]$ ssh pl
Welcome to Ubuntu 18.04.2 LTS (GNU/Linux 4.15.0-54-generic x86_64)
```

Nos vamos a `/var/systemd/resolve`:

```
usuario@ubuntu:~$ ls -l /var/run/systemd/resolve/
total 8
-rw-r--r-- 1 systemd-resolve systemd-resolve 607 abr 24 12:52 resolv.conf
-rw-r--r-- 1 systemd-resolve systemd-resolve 715 abr 24 12:52 stub-resolv.conf
```

### /var/run/systemd/resolve/resolv.conf

```
usuario@ubuntu:~$ cat /var/run/systemd/resolve/resolv.conf
```

```
# This file is managed by man:systemd-resolved(8). Do not edit.
#
# This is a dynamic resolv.conf file for connecting local clients directly to
# all known uplink DNS servers. This file lists all configured search domains.
#
# Third party programs must not access this file directly, but only through the
# symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a different way,
# replace this symlink by a static file or a different symlink.
#
# See man:systemd-resolved.service(8) for details about the supported modes of
# operation for /etc/resolv.conf.

nameserver 10.4.9.30
nameserver 10.4.9.29
```

```
usuario@ubuntu:~$ cat /var/run/systemd/resolve/stub-resolv.conf
```

```
# This file is managed by man:systemd-resolved(8). Do not edit.
#
# This is a dynamic resolv.conf file for connecting local clients to the
# internal DNS stub resolver of systemd-resolved. This file lists all
# configured search domains.
#
# Run "systemd-resolve --status" to see details about the uplink DNS servers
# currently in use.
#
# Third party programs must not access this file directly, but only through the
# symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a different way,
# replace this symlink by a static file or a different symlink.
#
# See man:systemd-resolved.service(8) for details about the supported modes of
# operation for /etc/resolv.conf.

nameserver 127.0.0.53
options edns0
```