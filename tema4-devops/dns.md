# DNS


* [How to Set DNS Nameservers on Ubuntu 18.04](https://linuxize.com/post/how-to-set-dns-nameservers-on-ubuntu-18-04/)

Back in the days, whenever you wanted to configure DNS resolvers in Linux you would simply open the `/etc/resolv.conf` file, edit the entries, save the file and you are good to go. 

This file still exists but it is a [symlink](https://linuxize.com/post/how-to-create-symbolic-links-in-linux-using-the-ln-command/) controlled by the systemd-resolved service and **should not be edited manually**.

Netplan configuration files are stored in the `/etc/netplan` directory. You’ll probably find one or two YAML files in this directory. The file name may differ from setup to setup. Usually, the file is named either `01-netcfg.yaml` or `50-cloud-init.yaml` but in your system, it may be different.

```
usuario@ubuntu:/etc/netplan$ pwd -P
/etc/netplan
usuario@ubuntu:/etc/netplan$ ls -l
total 8
-rw-r--r-- 1 root root 485 abr 24 11:09 01-netcfg.yaml
-rw-r--r-- 1 root root 241 abr 24 11:04 01-netcfg.yaml-initial
usuario@ubuntu:/etc/netplan$
```

Below are some of the most popular public DNS resolvers:

```
Google (8.8.8.8, 8.8.4.4)
Cloudflare (1.1.1.1 and 1.0.0.1)
OpenDNS (208.67.222.222, 208.67.220.220)
Level3 (209.244.0.3, 209.244.0.4)
```

To configure the DNS servers we open the interface configuration file with our editor:

```
sudo vi /etc/netplan/01-netcfg.yaml
```

```
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

```
$ sudo netplan apply
```

Netplan will generate the configuration files for the systemd-resolved service.

To verify that the new DNS resolvers are set, run the following command:

```
systemd-resolve --status | grep 'DNS Servers' -A2
```

`systemd-resolve -status` prints a lot of information.
We are using `grep` to filter the `'DNS Servers'` string. 

The output will look something like this:

`usuario@ubuntu:/etc/netplan$ systemd-resolve --status | grep 'DNS Servers' -A4
         DNS Servers: 8.8.8.8
                      8.8.4.4
                      1.1.1.1
                      1.0.0.1
                      209.244.0.3
```