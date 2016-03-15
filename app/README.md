# Quilt - Front End ReadMe

## Usage

Working with Quilt requires Xcode 7+ on OSX.

When developing in an Xcode emulator, ensure that ios/Quilt/AppDelegate.m has jsCodeLocation set to [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"].
In order to get the development environment running, open ios/Quilt.xcodeproj in Xcode.
Start by selecting your emulator and clicking the play button in the top-left corner.

When developing on a physical phone, first make sure your phone and computer
are connected to the same wifi. Run the following code to get your network IP:
```sh
  ifconfig | grep inet\ | tail -1 | cut -d " " -f 2
```
Replace 'localhost' with the IP in the ios/Quilt/AppDelegate.m line mentioned above.
In xcode, select your phone from the 'set active scene' options and press play in the top-left corner.

## Development

### Installing Dependencies

Be sure to have npm 3+ installed.
From within the root directory:

```sh
$ npm install
```
