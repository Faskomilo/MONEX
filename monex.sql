create database if not exists monex;

use monex; 

create table if not exists admins(
id int(11) primary key not null, 
username varchar(15) not null,
password varchar(30) not null
);

create table if not exists adminlog(
id int(11) primary key not null,
idAdmin int(11) not null,
date date not null,
idBill int(11) not null,
action text not null
);

create table if not exists bills(
id int(11) primary key not null,
money int(11) not null,
quantity int(11) not null
);

create table if not exists actionlog(
id int(11) primary key not null,
idBill int(11) not null,
billsGiven varchar(50) not null,
date date not null
);

create table if not exists voicebills(
id int(11) primary key not null,
recording text not null,
idBill int(11) not null
);

create table if not exists allmessages(
id int(11) primary key not null,
idVoiceAction int(11) not null,
idVoiceNumber int(11) not null,
idVoiceBill int(11) not null
);

create table if not exists voiceactions(
id int(11) primary key not null,
recording text not null
);

create table if not exists voicenumbers(
id int(11) primary key not null,
recording text not null
);

create table if not exists sessions(
cookie char(43) primary key not null,
idAdmin int(11) not null,
date Date not null
);

alter table adminlog add constraint fk_adminlog_admins foreign key(idAdmin) references admins(id);

alter table adminlog add constraint fk_adminlog_bills foreign key(idBill) references bills(id);

alter table actionlog add constraint fk_actionlog_bills foreign key(idBill) references bills(id);

alter table voicebills add constraint fk_voicebills_bills foreign key(idBill) references bills(id);

alter table allmessages add constraint fk_allmessages_voicebills foreign key(idVoiceBill) references voicebills(id);
alter table allmessages add constraint fk_allmessages_voiceactions foreign key(idVoiceAction) references voiceactions(id);
alter table allmessages add constraint fk_allmessages_voicenumbers foreign key(idVoiceNumber) references voicenumbers(id);

alter table sessions add constraint fk_session_admin foreign key(idAdmin) references admins(id);