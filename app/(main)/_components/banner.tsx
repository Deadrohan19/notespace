"use client"

import React from 'react'

import { Id } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modals/confirm-modal'



export const Banner = ({ documentId }: {documentId:Id<"documents">}) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Removing...",
            success: "Page deleted",
            error: "Failed to remove"
        })

        router.push("/documents");
    }

    const onRestore = () => {
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "Restoring...",
            success: "Page restored",
            error: "Failed to restore"
        })
    }

  return (
    <div className='w-full bg-rose-500 text-center text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
        <p>
            This page is in the trash.
        </p>

        <Button
            size="sm"
            onClick={onRestore}
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
            Restore Page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
        <Button
            size="sm"
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
            Delete Forever
        </Button>
        </ConfirmModal>
    </div>
  )
}
