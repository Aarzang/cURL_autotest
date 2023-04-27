
import os
import pycurl
try:
    from io import BytesIO
except ImportError:
    from StringIO import StringIO as BytesIO
separator = ' '
if os.path.exists('serverdata.txt'):
    datafile = open('serverdata.txt', 'rt')
    server = datafile.readline()[:-1]
    pages = datafile.readline()[:-1].split(separator)
    datafile.close
else:
    print('Coud not find datafile, reverting to default')
    server = 'http://locahost:1337'
    pages = ['html', 'json', 'csv', 'interror', 'error404']
print(server + '/' + pages[4])


buffer = BytesIO()
c = pycurl.Curl()
c.setopt(c.URL, server + '/' + pages[4])
c.setopt(c.WRITEDATA, buffer)
c.perform()
c.close()

body = buffer.getvalue()

print(body.decode('iso-8859-1'))
