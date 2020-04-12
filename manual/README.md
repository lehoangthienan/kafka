# setup manual

sudo useradd kafka -m

sudo passwd kafka

sudo adduser kafka sudo

su -l kafka

apt-get update -y

# install java

add-apt-repository ppa:webupd8team/java

apt-get install oracle-java8-installer -y

java -version

# install kafka

curl "https://www.apache.org/dist/kafka/2.1.1/kafka_2.11-2.1.1.tgz" -o ~/Downloads/kafka.tgz

mkdir ~/kafka && cd ~/kafka

tar -xvzf ~/Downloads/kafka.tgz --strip 1

properties => nano ~/kafka/config/server.properties => config kafka

sudo nano /etc/systemd/system/zookeeper.service

/opt/Kafka/bin/kafka-server-start.sh /opt/Kafka/config/server.properties => config service of ubuntu for keep connection

# install zookeeper

apt-get install zookeeperd -y

netstat -nlpt | grep ':2181'


# start service
sudo systemctl start kafka
sudo journalctl -u kafka
sudo systemctl enable kafka

=> same for zookeeper

# test kafka

~/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic TutorialTopic

echo "Hello, World" | ~/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic TutorialTopic > /dev/null

~/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic TutorialTopic --from-beginning

# setup shell file

=> kafka_install.sh

=> zookeeper_install.sh

=> start.sh