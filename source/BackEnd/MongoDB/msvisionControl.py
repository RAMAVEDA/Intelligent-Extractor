from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
import time,os

url = os.environ['ACCOUNT_URL']
key = os.environ['ACCOUNT_KEY_VISION']

credentials = CognitiveServicesCredentials(key)
client = ComputerVisionClient(
     
    endpoint=url,
    credentials=credentials
)

def consumeVision(image_paths):    
    rawHttpResponse = client.read(image_paths, language="en", raw=True)
    time.sleep(2)
    numberOfCharsInOperationId = 36
    operationLocation = rawHttpResponse.headers["Operation-Location"]
    idLocation = len(operationLocation) - numberOfCharsInOperationId
    operationId = operationLocation[idLocation:]
    # Retrieve the results 
    while True:
        read_result = client.get_read_result(operationId)
        if read_result.status.lower() not in ['notstarted', 'running']:
            break
        time.sleep(1)
    # Get the detected text
    if read_result.status == OperationStatusCodes.succeeded:
        return read_result.analyze_result