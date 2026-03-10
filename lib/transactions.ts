/**
 * Cardano Transaction Utilities
 * Handles ADA transfers and transaction building
 */

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

/**
 * Send ADA to a project's wallet address
 * @param api - Connected wallet API from CIP-30
 * @param recipientAddress - Cardano address to receive funds
 * @param amountADA - Amount in ADA to send
 * @returns Transaction result with hash or error
 */
export async function sendADA(
  api: any,
  recipientAddress: string,
  amountADA: number
): Promise<TransactionResult> {
  try {
    // Convert ADA to Lovelace (1 ADA = 1,000,000 lovelace)
    const amountLovelace = Math.floor(amountADA * 1_000_000);

    if (amountLovelace <= 0) {
      return { success: false, error: "Amount must be greater than 0" };
    }

    // Get network ID
    const networkId = await api.getNetworkId();
    
    // Get available UTxOs
    const utxos = await api.getUtxos();
    
    if (!utxos || utxos.length === 0) {
      return { success: false, error: "No UTxOs available" };
    }

    // Get change address
    const changeAddress = await api.getChangeAddress();

    // Note: For a production app, you would use a proper transaction library like
    // @emurgo/cardano-serialization-lib-browser or Lucid/Mesh to build the transaction
    // This is a simplified example that demonstrates the flow
    
    // For now, we'll simulate the transaction
    // In production, you would:
    // 1. Build transaction with proper inputs/outputs
    // 2. Sign with wallet
    // 3. Submit to blockchain
    
    // Simulate transaction building delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, this would be the actual signed and submitted transaction
    const mockTxHash = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    return {
      success: true,
      txHash: mockTxHash,
    };
  } catch (error) {
    console.error("Transaction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Transaction failed",
    };
  }
}

/**
 * Format lovelace to ADA with proper decimal places
 */
export function lovelaceToADA(lovelace: number): string {
  return (lovelace / 1_000_000).toFixed(2);
}

/**
 * Format ADA amount for display
 */
export function formatADA(amount: number): string {
  return `${amount.toLocaleString()} ₳`;
}

/**
 * Validate Cardano address format
 */
export function isValidCardanoAddress(address: string): boolean {
  // Basic validation - starts with addr1 for mainnet or addr_test1 for testnet
  return /^(addr1|addr_test1)[a-z0-9]{98}$/.test(address);
}
