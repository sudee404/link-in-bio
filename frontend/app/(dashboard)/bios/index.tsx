"use client"
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Fragment, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserContextContext } from '@/context/UserContext';



export default function LinkInBioList() {
    const { user: { bios }={} } = useContext(UserContextContext)
    return (
        <Fragment>
            <h1 className="text-3xl font-bold  mb-6">Your Link in Bio Pages</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {bios?.map((bio) => (
                    <Card key={bio.id} >
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold  mb-2">{bio.title}</h2>
                            {/* type */}
                            <p className="text-sm text-gray-600 mb-1">Type: {bio.type}</p>
                            <p className="text-sm text-gray-600 mb-1">Links: {bio.links?.length}</p>
                            <p className="text-sm text-gray-600">Last updated: {new Date(bio.updated_at).toLocaleDateString()}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href={`/bios/${bio.username}`}>View</Link>
                            </Button>
                            <Button asChild>
                                <Link href={`/bios/${bio.username}/edit`}>Edit</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Button asChild>
                    <Link href="/bios/create">Create New Link in Bio Page</Link>
                </Button>
            </div>
        </Fragment>
    )
}

