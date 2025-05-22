import lighthouse from '@lighthouse-web3/sdk';

// Upload JSON metadata to Lighthouse
export async function uploadMetadataToLighthouse(metadata: Record<string, any>) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Lighthouse API key not found in environment variables');
    }

    // Convert JSON to Blob
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    
    // Create a File object from the Blob
    const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

    // Upload to Lighthouse
    const response = await lighthouse.upload(
      [metadataFile],
      apiKey
    );

    console.log('Metadata upload response:', response);
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error uploading metadata to Lighthouse:', error);
    return {
      success: false,
      error
    };
  }
}

// Upload audio file to Lighthouse
export async function uploadAudioToLighthouse(audioFile: File) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Lighthouse API key not found in environment variables');
    }

    // Upload to Lighthouse
    const response = await lighthouse.upload(
      [audioFile],
      apiKey
    );

    console.log('Audio upload response:', response);
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error uploading audio to Lighthouse:', error);
    return {
      success: false,
      error
    };
  }
}

// Upload base64 audio to Lighthouse
export async function uploadBase64AudioToLighthouse(base64Audio: string, fileName: string = 'audio.mp3') {
  try {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Lighthouse API key not found in environment variables');
    }

    // Convert base64 to blob
    const byteString = atob(base64Audio.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: 'audio/mp3' });
    const audioFile = new File([blob], fileName, { type: 'audio/mp3' });

    // Upload to Lighthouse
    const response = await lighthouse.upload(
      [audioFile],
      apiKey
    );

    console.log('Base64 audio upload response:', response);
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error uploading base64 audio to Lighthouse:', error);
    return {
      success: false,
      error
    };
  }
}

// Upload full NFT data (audio + metadata) to Lighthouse
export async function uploadNFTToLighthouse(
  base64Audio: string, 
  fileName: string, 
  metadata: Record<string, any>
) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Lighthouse API key not found in environment variables');
    }

    // Convert base64 to blob
    const byteString = atob(base64Audio.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const audioBlob = new Blob([ab], { type: 'audio/mp3' });
    const audioFile = new File([audioBlob], fileName, { type: 'audio/mp3' });

    // Convert JSON to Blob
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

    // Upload to Lighthouse
    const response = await lighthouse.upload(
      [audioFile, metadataFile],
      apiKey
    );

    console.log('NFT upload response:', response);
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error uploading NFT to Lighthouse:', error);
    return {
      success: false,
      error
    };
  }
}
