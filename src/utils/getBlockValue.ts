// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getBlockValueByDiscriminant(blocks: any, discriminant: any) {
  const block = blocks.find(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (block: any) => block.discriminant === discriminant
  )
  return block ? block.value : null
}
